<%@taglib  uri="/struts-tags" prefix="s" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <%--Dependencias de ReactJS--%>
        <script src="https://unpkg.com/react@latest/umd/react.development.js" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js" crossorigin="anonymous"></script>
        <%--Dependencias de BabelJS--%>
        <script src="https://unpkg.com/babel-standalone@latest/babel.min.js" crossorigin="anonymous"></script>
        <%--Dependencias y recursos de Material UI y Material Icons--%>
        <script src="https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    <body>
        <%String user = (String) request.getSession().getAttribute("sesionusuario");%>
        <h3>Profesor: <%=user%></h3>
        <h1>Creación de Preguntas</h1>
        <div id="app"></div>
        <div id="contenido"></div>
        <script  type="text/babel" src="tablaPreguntas.jsx">


        </script>
        <br/><br/><a href="examenProfesor.jsp" class='btn-ghost round'>Ver exámenes</a>
    </body>
</html>
