# https://davidjuan.com/technology/2020/05/30/jekyll-s3-static-site-blog
find _site/ -type f ! -iname 'index.html' -iname '*.html' -print0 | while read -d $'\0' f; do mv "$f" "${f%.html}"; done
