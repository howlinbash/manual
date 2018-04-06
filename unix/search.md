[The Howlin Developer Guide](/index.md)



Search
======

[Back to Unix](./intro.md)


## To Parse


```bash
## Grep

grep -n "#......;" directory/file.css 
	8:	color: #606060;
	30:	color: #f4473a;
	34:	color: #f4473a;
	83:	background: #3a4755;

grep "#......;" directory/file.css | sed -e 's/.*\(\#.\{6\}\).*/\1/' 
	#606060
	#f4473a
	#f4473a
	#3a4755

grep "#......;" directory/file.css | sed -e 's/.*\(\#.\{6\}\).*/\1/' | sort | uniq
	#3a4755
	#606060
	#f4473a

grep -nr "selected_choice" ./
	Binary file .//.process.php.swp matches
	.//process.php:12:	  $selected_choice = $_POST['choice'];
	.//process.php:37://7	  if($correct_choice == $selected_choice){

find / -name 'QUERY'
locate

- grep has a '-c' switch that counts occurences. Don't pipe grep to 'wc -l'.


find /home/user/ -type f | xargs sed -i  's/a.example.com/b.example.com/g'
```
