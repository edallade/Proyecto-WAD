package actionsupportpackage;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.jdom2.Attribute;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class crearExamen extends ActionSupport {

    public crearExamen() {
    }

    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        String xml = request.getSession().getServletContext().getRealPath("/");
        String[] idTest = request.getParameterValues("Seleccionado");
        String ExamenN = (String) request.getParameter("nombre");
        String idUsuario = (String) request.getSession().getAttribute("userID");
        try {
            //Contruye un documento JDOM usando SAX, para procesar xml
            SAXBuilder builder = new SAXBuilder();
            //Para obtener la ruta absoluta del proyecto XML
            String rutaAbsoluta = request.getSession().getServletContext().getRealPath("/");
            rutaAbsoluta = rutaAbsoluta.replace("\\", "/");
            rutaAbsoluta = rutaAbsoluta.replaceAll("/build", "");
            rutaAbsoluta = rutaAbsoluta.concat("Data.xml");
            File BD = new File(rutaAbsoluta);

            //Para cargar el documento xml
            Document doc = builder.build(BD);//documentos para contruir base de datos
            //Se obtiene el elemento raiz del xml
            Element QuestionWriter = doc.getRootElement();

            //Crea los elementos que conforman a un Usuario con los valores del nuevo registro
            Element grupoP = new Element("quiz");
            Element nombreG = new Element("name");

            //Lista de nodos almacenados, lo que esta contenido entre las etiquetas de QuestionWriter
            List lista2 = QuestionWriter.getChildren("quiz");
            String id = "";
            int id2;
            //Obtiene informacion del último elemento añadido, para asignar ID
            Element e;
            if (lista2.size() == 0) {
                id = "1";
            } else {
                e = (Element) lista2.get(lista2.size() - 1);
                id = e.getAttributeValue("quizID");
                id2 = Integer.parseInt(id) + 1;
                id = "" + id2;//para ultimo id
            }

            grupoP.setAttribute("quizID", id);
            grupoP.setAttribute("teacherID", idUsuario);
            nombreG.setText(ExamenN);//setText lo que va entre etiqueta de apertura y cierre
            List lista = QuestionWriter.getChildren("test");
            //Para obtener nombre del profesor
            //Para recorrer el arbol de nodos
            for (int i = 0; i < lista.size(); i++) {//Por cada elemento 
                //Se procesa un elemento de la lista
                Element element = (Element) lista.get(i);//guarda los datos de la lista en un arreglo de elementos
                //encontrar el elemento con el id capturado
                Attribute idT = element.getAttribute("id");

            }

            //Agregar contenido de los elementos a nodo padre (user)
            grupoP.addContent(nombreG);
            for (int i = 0; i < idTest.length; i++) {
                Element idAlumno = new Element("testID");
                idAlumno.setText(idTest[i]);
                grupoP.addContent(idAlumno);
            }

            //Agregar contenido de user a QuestionWriter
            QuestionWriter.addContent(grupoP);

            //Se crea serializador xml (para guardar en el xml)
            XMLOutputter xmlo = new XMLOutputter();

            //validar que si escriba bien el archivo, guardar los cambios al archivo
            try (FileWriter fw = new FileWriter(rutaAbsoluta)) {
                xmlo.setFormat(Format.getPrettyFormat());//Formato de salida al xml
                xmlo.output(doc, fw);//se escribe en el archivo
                fw.flush();
            }
            return "crearexamen";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "crearexamen";
    }

}
