<%-- 
    Document   : crea
    Created on : 20/05/2019, 09:35:12 AM
    Author     : alexis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Missing Words</title>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    </head>
    <body>
        <script src="React/react.development.js" crossorigin=""></script>
        <script src="React/react-dom.development.js" crossorigin=""></script>
        <script src="React/babel.min.js" crossorigin=""></script> 

        <%String user = (String) request.getSession().getAttribute("sesionusuario");
            if (user == null) {
                response.sendRedirect("input1.jsp");
            }
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

        <h1>Creador Missing Words</h1>
        <div id="c">

        </div>
        <script type="text/babel" src="creapregunta_react.jsx"></script>
    </body>
</html>
