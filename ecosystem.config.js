module.exports = {
  apps: [{
    name: 'trailer',
    script: './start.js',
    watch: false,
    env: {
      COMMON_VARIABLE: true,
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'trailer',
      host: '主机名',
      ref: 'origin/master',
      repo: 'Git仓库',
      path: '上传到服务器上的地址',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy': 'git fetch',
      'post-deploy': 'source $HOME/.zshrc && yarn install && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
