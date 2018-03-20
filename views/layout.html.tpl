<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <title>{% block title %}{% endblock %}</title>
        {% block stylesheet %}
            <link rel="stylesheet" type="text/css" href="/static/dist/layout.css" />
        {% endblock %}
        {% block javascript %}
            <script src="//cdn.jsdelivr.net/npm/vue"></script>
            <script src="//cdn.jsdelivr.net/npm/vue-resource"></script>
            <script src="/static/dist/main.js"></script>
        {% endblock %}
    </head>
    <body class="center cool cool-color cool-gradient-crazy" onload="start();">
        {% block content %}{% endblock %}
    </body>
</html>
