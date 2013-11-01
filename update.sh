#git reset --hard
#git pull
site_domain=`printf '%s\n' "${PWD##*/}"`
echo $site_domain
ruby change-site-urls.rb $site_domain api.$site_domain