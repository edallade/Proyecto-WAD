<%@taglib  uri="/struts-tags" prefix="s" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Exámenes</title>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    </head>
    <body>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin=""></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin=""></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin=""></script>
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
        <br><h1>Exámenes</h1>
        <br><div id="app"></div>
        <script  type="text/babel" src="tablaExamenes.jsx">


        </script>
    </body>
</html>
