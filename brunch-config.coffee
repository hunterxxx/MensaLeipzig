exports.config =
    conventions:
        ignored: /vendor.js|codemirror.css|colorpicker.css|((.*(\/|\\))[_].*\.scss)/
    modules:
        definition: false
        wrapper: false
    paths:
        'public': 'build'
        'watched': [ 'plugin' ]
    files: 
        javascripts:
            joinTo:
                'js/vendor.js': /^bower_components|^vendor/
                'js/plugin.js': /^plugin/
            order:
                before: [
                ]
        stylesheets:
            joinTo: 'css/app.css'
        templates:
            joinTo:
                'js/dontUseMe' : /^plugin/ # dirty hack for Jade compiling.
    plugins:
        jade:
            pretty: yes # Adds pretty-indentation whitespaces to output (false by default)
        jade_angular:
            locals: {}
        uglify:
            mangle: true 
            compress:
                global_defs:
                    DEBUG: false
        autoReload:
            delay: 1000
        sass:
            mode: 'native'
    minify: true
    watcher:
        usePolling: true

