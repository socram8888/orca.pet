
Jekyll::Hooks.register :site, :post_render do |site, payload|
	site.pages.each do |page|
		if page.data['hosts_url'] then
			dir, file = File.split(page.data['hosts_url'])
			new_page = Jekyll::Page.new(site, site.source, dir, file)

			# Add www. variants to SLDs
			new_page.output = page.output.gsub(/^[a-z0-9]+\.[a-z]+$/, "\\0\nwww.\\0")

			# Add 0.0.0.0 hosts
			new_page.output.gsub!(/^([a-z0-9-]+\.)+[a-z]+$/, '0.0.0.0 \0')

			page.site.pages << new_page
		end
	end
end
