<%-- 
    Document   : creaSequencing
    Created on : 31-may-2019, 11:46:07
    Author     : saidsoria
--%>

<%@taglib  uri="/struts-tags" prefix="s" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Creador de Preguntas Sequencing</title>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    </head>
    <body>
        <script src="React/react.development.js" crossorigin=""></script>
        <script src="React/react-dom.development.js" crossorigin=""></script>
        <script src="React/babel.min.js" crossorigin=""></script>
    <body>
        
        <%String user = (String) request.getSession().getAttribute("sesionusuario");
         
        %>

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
                <li><a href="signout.jsp">Cerrar Sesión</a></li>
            </ul>
        </div><br><br><br><br>
        <!---------------------------MENÚ----------------------------->

        <h3>Profesor: <%=user%></h3>
        <br><h1>Creador Sequencing</h1>
        <br><div id="c"></div>
        <script  type="text/babel" src="Sequencing.jsx">


        </script>
    </body>
</html>
