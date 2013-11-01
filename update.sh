git reset --hard
git pull

dir = $(printf '%s\n' "${PWD##*/}")

ruby change-site-urls #dir api.$dir