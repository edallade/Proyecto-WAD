<%-- 
    Document   : signout
    Created on : 04-jun-2019, 20:08:08
    Author     : i5-6500
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%request.getSession().removeAttribute("sesionusuario");
        response.sendRedirect("input1.jsp");%>
    </body>
</html>
