git reset --hard
git pull

site_domain=`printf '%s\n' "${PWD##*/}"`
ruby change-site-urls.rb $site_domain data.$site_domain

jekyll build