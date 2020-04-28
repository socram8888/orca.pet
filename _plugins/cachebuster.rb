# Based on: https://gist.github.com/yaroslav/a1acc36b49820474b4e0218c0ca8908d

require 'digest'

module Jekyll
	# Jekyll assets cachebuster filter
	#
	# Place this file into `_plugins`.
	module CachebusterFilter
		PATH_FINGERPRINTS = {}

		# Usage example:
		#
		# {{ "/style.css" | cachebuster }}
		# {{ "/style.css" | cachebuster | absolute_url }}
		def cachebuster(path)
			path = root_relative_path(path)
			fp = path_to_fingerprint(path)

			if fp.nil? then
				raise "Unable to calculate fingerprint for #{path}"
			end

			"#{path}?#{fp}"
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
			fp = PATH_FINGERPRINTS[path]

			if fp.nil? then
				hash = hash_static(path) || hash_page(path)

				unless hash.nil?
					fp = hash[0, 8]
					PATH_FINGERPRINTS[path] = fp
				end
			end

			fp
		end

		def hash_static(path)
			file = @context.registers[:site].static_files.detect { |e| e.url == path }

			unless file.nil? then
				Jekyll.logger.info("FPing static:", path)
				Digest::MD5.file(file.path).hexdigest
			end
		end

		def hash_page(path)
			page = @context.registers[:site].pages.detect { |e| e.url == path }

			unless page.nil? then
				Jekyll.logger.info("FPing page:", path)
				Digest::MD5.hexdigest(page.output)
			end
		end
	end
end

# Sort so assets are rendered first

RENDER_FIRST = [
	"assets",
]

Jekyll::Hooks.register :site, :pre_render do |site, payload|
	site.pages.sort! { |a,b|
		a_idx = RENDER_FIRST.index { |x| a.path.start_with? x }
		b_idx = RENDER_FIRST.index { |x| b.path.start_with? x }

		if not a_idx.nil? then
			if b_idx.nil? then
				-1
			elsif a_idx != b_idx then
				a_idx - b_idx
			else
				a.path.casecmp(b.path)
			end
		elsif not b_idx.nil? then
			+1
		else
			a.path.casecmp(b.path)
		end
	}
end

Liquid::Template.register_filter(Jekyll::CachebusterFilter)
