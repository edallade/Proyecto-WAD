<%@taglib  uri="/struts-tags" prefix="s" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Preguntas</title>
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

        <!---------------------------MENÚ----------------------------->
        <div id="header">
            <ul class="nav">
                <li><a href="profesor.jsp">Preguntas</a>
                    <ul>
                        <li><a href="crea.jsp">Crear Pregunta Missing Words</a></li>
                        <li><a href="creaSequencing.jsp">Crear Pregunta Sequencing</a></li>
                    </ul>
                </li>
                <li><a href="examenProfesor.jsp">Exámenes</a>
                    <ul>
                        <li><a href="crearExamen.jsp">Crear Examen</a></li>
                    </ul>
                </li>
                <li><a href="">Cerrar Sesión</a></li>
            </ul>
        </div><br><br><br><br>
        <!---------------------------MENÚ----------------------------->


        <h3>Profesor: <%=user%></h3>
        <br><h1>Preguntas</h1>
        <br><div id="app"></div>
        <script  type="text/babel" src="tablaPreguntas.jsx">


        </script>
    </body>
</html>
