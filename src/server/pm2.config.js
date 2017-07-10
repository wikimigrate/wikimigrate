module.exports = {
    apps: [
        {
            name:   'chat',
            cwd:    './server',
            script: 'server/server/chat.js',
            watch:  ['server'],
        },
        {
            name:   'job',
            cwd:    './server/server',
            script: 'server/server/job.js',
            watch: true
        },
        {
            name:   'render.bundle',
            cwd:    './ssr',
            script: 'ssr/render.bundle.js',
            watch:  ['ssr'],
        },
    ],
}
