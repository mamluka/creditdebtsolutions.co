require 'yaml'

config = YAML.load(File.read('_config.yml'))

p "Loaded the file"

config['url'] = "http://#{ARGV[0]}"
config['post_url'] = "http://#{ARGV[1]}/lead"

File.open('_config.yml','w') { |f| f.write config.to_yaml }

"Wrote file to disk"