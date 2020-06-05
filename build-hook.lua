
function handle(r)
	r.content_type = "text/plain"

	-- This file is outside the page root, don't both trying to read it ;)
	kfile = io.open('/var/www/orcapet/build-hook.key', 'r')
	key = kfile:read()
	kfile:close()

	get, getmulti = r:parseargs()
	if get['key'] == key then
		r:puts('Requesting')
		pipe = io.open('/tmp/orca-pet-daemon.pipe', 'w')
		pipe:write(tostring(get['repo']) .. '\n')
		pipe:close()
	else
		r:puts('Nope')
	end
end
