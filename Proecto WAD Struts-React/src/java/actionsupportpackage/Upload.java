package actionsupportpackage;

import java.io.File;
import org.apache.commons.io.FileUtils;
import com.opensymphony.xwork2.ActionSupport;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.*;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class Upload extends ActionSupport
{
    private File userImage;
    private String userImageContentType;
    private String userImageFileName;
 
    @Override
    public String execute() throws JDOMException, IOException {
                        HttpServletRequest request = ServletActionContext.getRequest();
           
        String RealPath = request.getSession().getServletContext().getRealPath("/");
            RealPath = RealPath.replace("\\", "/");
            RealPath = RealPath.replaceAll("/build", "");
          try 
        {
            File fileToCreate = new File(RealPath+"/media", this.userImageFileName);
            FileUtils.copyFile(this.userImage, fileToCreate);
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
            addActionError(e.getMessage());
            System.out.println("errrrrooooooooooooooooooooooooor");
        }
           SAXBuilder builder = new SAXBuilder();

            RealPath = RealPath.concat("medios.xml");
            System.out.println(RealPath);
            File build = new File(RealPath);
            
            Document doc = builder.build(build);
            Element Data = doc.getRootElement();
            Element pregunta = new Element("medio");
            pregunta.setText(this.userImageFileName);
            Data.addContent(pregunta);
             XMLOutputter xmlo = new XMLOutputter();

            try (FileWriter fw = new FileWriter(RealPath)) {
                xmlo.setFormat(Format.getPrettyFormat());//Formato de salida al xml
                xmlo.output(doc, fw);//se escribe en el archivo
                fw.flush();
            }
            catch (Exception e) {
            e.printStackTrace();
        }

      
                   


        return "exitoso";
    }
 
    public File getUserImage() {
        return userImage;
    }
 
    public void setUserImage(File userImage) {
        this.userImage = userImage;
    }
 
    public String getUserImageContentType() {
        return userImageContentType;
    }
 
    public void setUserImageContentType(String userImageContentType) {
        this.userImageContentType = userImageContentType;
    }
 
    public String getUserImageFileName() {
        return userImageFileName;
    }
 
    public void setUserImageFileName(String userImageFileName) {
        this.userImageFileName = userImageFileName;
    }

}
