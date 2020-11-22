module Jekyll
	module TextColorFilter
		PATH_FINGERPRINTS = {}

		# Usage example:
		#
		# {{ "#004455" | textcolor }}
		def textcolor(back)
			if back.nil? then
				raise "Background color cannot be null"
			end

			back = hex2rgb(back)
			fore = islight(back) ? '#000' : '#fff'
			
			fore
		end

		private

		def hex2rgb(hex)
			hex = hex.downcase
			match = hex[/^(#|0x)?([a-f0-9]{3}([a-f0-9]{3})?)$/,2]
			if match.nil? then
				raise "Invalid color %s" % [hex]
			end

			if match.length == 3 then
				rgb = [
					match[0,1].hex * 0x11,
					match[1,1].hex * 0x11,
					match[2,1].hex * 0x11
				]
			else
				rgb = [
					match[0,2].hex,
					match[2,2].hex,
					match[4,2].hex
				]
			end

			rgb
		end
		
		def rgb2luma(rgb)
			rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114
		end
		
		def islight(rgb)
			rgb2luma(rgb) > 186
		end
	end
end

Liquid::Template.register_filter(Jekyll::TextColorFilter)
