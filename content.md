# Day 1
* make a modal "Adding feedback"

I have decided to store the text in the database in markdown. I convert links and line breaks before saving.

At the front I use react-markdown, which protects against XSS attacks. Also put a plugin rehype-sanitize for additional protection, which is passed as prop.

Pictures are reduced to 1280px and converted to webp. To display on the front I calculate the aspect ratio and save it in the database.

# Day 2
* make a modal "complete goal"
* disable new checkboxes and button until the next day



