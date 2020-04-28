# Source: https://gist.github.com/yaroslav/a1acc36b49820474b4e0218c0ca8908d

require 'digest'

module Jekyll
	# Jekyll assets cachebuster filter
	#
	# Place this file into `_plugins`.
	module CachebusterFilter
		# Usage example:
		#
		# {{ "/style.css" | cachebuster }}
		# {{ "/style.css" | cachebuster | absolute_url }}
		def cachebuster(filename)
			hash = Digest::MD5.file(
				File.join(@context.registers[:site].dest, filename)
			)

			"#{filename}?#{hash.hexdigest[0, 8]}"
		rescue
			# Return filename unmodified if file was not found
			filename
		end
	end
end

Liquid::Template.register_filter(Jekyll::CachebusterFilter)
