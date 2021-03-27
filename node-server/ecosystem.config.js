module.exports = {
    apps: [{
        name: "node-server",
        script: 'node -r ./index.js',
        watch: '.',
        //-----config "Cluster Mode"-----//
        // instances: "max",
        // exec_mode: "cluster",
        "env": {
            "NODE_ENV": "company"
        },
        "env_production": {
            "NODE_ENV": "home"
        }
    }],
    deploy: {
        compayny: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env company',
            'pre-setup': '',
            "env": {
                "NODE_ENV": "company"
            }
        },
        home: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env home',
            'pre-setup': '',
            "env": {
                "NODE_ENV": "home"
            }
        }
    }
};
