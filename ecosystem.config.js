module.exports = {
  apps : [{
	name: "adminmallcode",	  
    	script: "serve -s build -l 3000",
    	watch: true,
	max_memory_restart: "1G",
	autorestart: true
  }]
};
