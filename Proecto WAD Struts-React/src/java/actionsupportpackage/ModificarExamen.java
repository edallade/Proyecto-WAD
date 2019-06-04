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

public class ModificarExamen extends ActionSupport {

    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        String[] idTest = request.getParameterValues("Seleccionado");
        String ExamenN = (String) request.getParameter("nombre");
        String idUsuario = (String) request.getSession().getAttribute("userID");
        String idE = request.getParameter("idExamen");
        
        System.out.println(idE);
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

            //Lista de nodos almacenados, lo que esta contenido entre las etiquetas de raiz
            List lista = QuestionWriter.getChildren("quiz");

            //Para recorrer el arbol de nodos
            for (int i = 0; i < lista.size(); i++) {//Por cada elemento 
                //Se procesa un elemento de la lista
                Element element = (Element) lista.get(i);//guarda los datos de la lista en un arreglo de elementos
                //encontrar el elemento con el id capturado
                Attribute idElement = element.getAttribute("quizID");
                
                if (idElement.getValue().matches(idE)) {//se ha encontrado usuario con id a modificar
                    //Obtiene los elementos que contiene el elemento actual
                    List lista2 = element.getChildren();//pasa los elementos a lista2
                    //Empieza la comparación
                    //Nombre
                    element.getChild("name").setText(ExamenN);
                    //eliminar 
                    List lista3 = element.getChildren("testID");
                    for(int j = 0; j < lista3.size(); j++){
                        element.removeChild("testID");
                    }
                    for (int j = 0; j < idTest.length; j++) {
                        Element idAlumno = new Element("testID");
                        idAlumno.setText(idTest[j]);
                        element.addContent(idAlumno);
                    }
                    
                    //Se crea serializador xml (para guardar en el xml)
                    XMLOutputter xmlo = new XMLOutputter();

                    //validar que si escriba bien el archivo, guardar los cambios al archivo
                    //                try (FileWriter fw = new FileWriter(rutaAbsoluta+"\\BD.xml")){
                    try (FileWriter fw = new FileWriter(rutaAbsoluta)) {
                        xmlo.setFormat(Format.getPrettyFormat());//Formato de salida al xml
                        xmlo.output(doc, fw);//se escribe en el archivo
                        fw.flush();
                    }
                    return "examenes";
                }

            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "examenes";
    }

}
