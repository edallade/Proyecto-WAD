package actionsupportpackage;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.apache.struts2.ServletActionContext;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class EliminarEjercicio extends ActionSupport {

    private String idRef;

    @Override
    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        String xml = request.getSession().getServletContext().getRealPath("/");
        xml = xml.replace("\\", "/");
        xml = xml.replaceAll("/build", "");
        xml = xml.concat("EjerciciosX.xml");
        File xmlFile = new File(xml);
        idRef = request.getParameter("idRef");
        int idU = Integer.parseInt(idRef);

        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder;
        try {
            dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(xmlFile);
            doc.getDocumentElement().normalize();
            deleteElement(doc, idU);
            doc.getDocumentElement().normalize();
            TransformerFactory transformerFactory;
            transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File(xml));
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.transform(source, result);
        } catch (TransformerException ex) {
        } catch (SAXException | IOException | ParserConfigurationException ex) {
            Logger.getLogger(EliminarEjercicio.class.getName()).log(Level.SEVERE, null, ex);
        }

        return "examenprofesor";
    }

    private void deleteElement(Document doc, int id) {
        NodeList list = doc.getElementsByTagName("test");
        for (int i = 0; i < list.getLength(); i++) {
            Node node = list.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                if (element.getAttribute("id").equals(String.valueOf(id))) {
                    Node prev = node.getPreviousSibling();
                    if (prev != null && prev.getNodeType() == Node.TEXT_NODE && prev.getNodeValue().trim().length() == 0) {
                        doc.getDocumentElement().removeChild(prev);
                    }
                    doc.getDocumentElement().removeChild(element);
                }
            }
        }
    }

    public String getIdRef() {
        return idRef;
    }

    public void setIdRef(String idRef) {
        this.idRef = idRef;
    }

}
