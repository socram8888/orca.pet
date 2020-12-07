Jekyll::Hooks.register :site, :post_read do |page|
	# Iterate through all companies
	page.data['trentierra'].each_value do |company|
		freq2chan = Hash.new

		# Iterate through all channels
		company['channels'].each do |channel|
			# Iterate through all subchannels
			upgraded = {}

			channel['subchannels'].each do |subchanname, mhz|
				if mhz.is_a? Numeric then
					chanlist = freq2chan[mhz]
					if freq2chan[mhz].nil? then
						chanlist = Array.new
						freq2chan[mhz] = chanlist
					end
					chanlist.append channel['number']
				else
					chanlist = Array.new
				end

				upgraded[subchanname] = {
					'frequency' => mhz,
					'shared' => chanlist
				}
			end

			channel['subchannels'] = upgraded
		end

		# Iterate again to remove each subchannel from its own shared channel list
		company['channels'].each do |channel|
			channel['subchannels'].each_value do |subchannel|
				subchannel['shared'] = subchannel['shared'].select { |x| x != channel['number'] }
			end
		end
	end
end
