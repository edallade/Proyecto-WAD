
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Editar Pregunta</title>
        <link rel="stylesheet" type="text/css" href="css/fondos.css"/>
    </head>
    <body>
        <script src="React/react.development.js" crossorigin=""></script>
        <script src="React/react-dom.development.js" crossorigin=""></script>
        <script src="React/babel.min.js" crossorigin=""></script> 

        <!---------------------------MENÚ----------------------------->
        <%String idRef = (String) request.getSession().getAttribute("valorPreg");%>

        <%String user = (String) request.getSession().getAttribute("sesionusuario");
            if (user == null) {
                response.sendRedirect("input1.jsp");
            }
        %>
        <div id="header">
            <%=idRef%>
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

        <div id="mod">

        </div>
        <script type="text/babel" src="mod_missing.jsx"></script>    </body>
    <input type="text" value="<%=idRef%>" hidden="true" id="numPreg"/>
</html>