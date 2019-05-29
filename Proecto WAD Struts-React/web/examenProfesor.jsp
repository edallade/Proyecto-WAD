<%@taglib  uri="/struts-tags" prefix="s" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    </head>
    <body>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin=""></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin=""></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin=""></script>
    <body>
        <%String user = (String) request.getSession().getAttribute("sesionusuario");%>
        <h3>Profesor: <%=user%></h3>
        <h1>Creación de Exámenes</h1>
        <div id="app"></div>
        <div id="contenido"></div>
        <script  type="text/babel" src="tablaExamenes.jsx">


        </script>
        <br/><br/><a href="profesor.jsp" class='btn-ghost round'>Ver Preguntas</a>
    </body>
</html>
