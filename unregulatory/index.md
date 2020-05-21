
sed -nr -e "s/^(country [^:]+:).*/\1\n\t(2402 - 2494 @ 20), (30)\n\t(5150 - 5835 @ 160), (30)\n\t(57000 - 66000 @ 2160), (40)\n/p" db.txt >db-mod.txt

./db2fw.py regulatory-mod.db db-mod.txt
