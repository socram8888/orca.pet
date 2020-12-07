# Based on: https://gist.github.com/yaroslav/a1acc36b49820474b4e0218c0ca8908d

require 'base64'
require 'digest'

module Jekyll
	# Jekyll assets cachebuster filter
	#
	# Place this file into `_plugins`.
	module CachebusterFilter
		# We need a stateful module to cache the fingerprints of already-known files.
		# Ideally this filter would be a class, but that's not something Liquid supports.
		#
		# We also need to have a static reference to the site, as during responsive image
		# rendering, the calls for the template rendering come with site unset, preventing
		# the filter from properly calculating the absolute file path.
		module State
			attr_accessor :site_instance, :path_fingerprints
			module_function :site_instance, :site_instance=,
					:path_fingerprints, :path_fingerprints=
		end

		# Usage example:
		#
		# {{ "/style.css" | cachebuster }}
		# {{ "/style.css" | cachebuster | absolute_url }}
		def cachebuster(renderpath, sourcepath='')
			if sourcepath.empty? then
				sourcepath = renderpath
			end

			sourcepath = root_relative_path(sourcepath)
			fp = path_to_fingerprint(sourcepath)

			if fp.nil? then
				raise "Unable to calculate fingerprint for #{sourcepath}"
			end

			"#{renderpath}?#{fp}"
		end

		private

		def root_relative_path(file)
			# Treat files not starting with / as relative to current page
			unless file.start_with?('/') then
				path = File.dirname(@context.environments.first['page']['path'])
				file = File.join(path, file)
			end

			# Normalize
			File.absolute_path(file, '/')
		end

		def path_to_fingerprint(path)
			fp = State.path_fingerprints[path]

			if fp.nil? then
				hash = hash_page(path) || hash_static(path)

				unless hash.nil?
					fp = Base64::urlsafe_encode64(hash[0, 6], :padding => false)
					State.path_fingerprints[path] = fp
				end
			end

			fp
		end

		def hash_static(path)
			file = File.join(State.site_instance.source, path)

			if File.file?(file) then
				Jekyll.logger.info("FPing static:", path)
				Digest::MD5.file(file).digest()
			end
		end

		def hash_page(path)
			page = State.site_instance.pages.detect { |e| e.url == path }

			unless page.nil? then
				Jekyll.logger.info("FPing page:", path)
				Digest::MD5.digest(page.output)
			end
		end
	end
end

Liquid::Template.register_filter(Jekyll::CachebusterFilter)

Jekyll::Hooks.register :site, :after_reset do |site|
	Jekyll::CachebusterFilter::State::site_instance = site
	Jekyll::CachebusterFilter::State::path_fingerprints = {}
end
