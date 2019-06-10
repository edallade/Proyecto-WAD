/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package actionsupportpackage;

import com.opensymphony.xwork2.ActionSupport;
import java.io.*;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.jdom2.*;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
/**
 *
 * @author alexis
 */
public class guardaPreg extends ActionSupport {
    
    public guardaPreg() {
        
    }
    
    public String execute() throws Exception {
       int  cont;
        
        HttpServletRequest request = ServletActionContext.getRequest();
        String xml = request.getSession().getServletContext().getRealPath("/");
        String name = request.getParameter("txt");
        String texto = request.getParameter("txt2");
        String sel = request.getParameter("sel");
        
        //recuperar parametros del formulario de creacion de la preguta
        System.out.println(name);
        System.out.println(texto);
        System.out.println(sel+"aaaaaaaaaaaaaaaaaaaaa");
        //contCaracteres regresa el numero de palabras faltantes denotadas por cada "&"
        
        cont = contCaracteres(texto,"&");
        System.out.println(cont);
        String splitText [] = new String [cont+1];
       splitText= texto.split("&");
        System.out.println(splitText);
        for(int i = 1 ;i<=cont;i++){
            for(int j =1 ; j<5 ; j++){
                System.out.println(request.getParameter("input"+i+"_"+j+" "));
            }
        }
        
        try {
            SAXBuilder builder = new SAXBuilder();
            String RealPath = request.getSession().getServletContext().getRealPath("/");
            RealPath = RealPath.replace("\\", "/");
            RealPath = RealPath.replaceAll("/build", "");
            RealPath = RealPath.concat("Data.xml");
            System.out.println(RealPath);
            File build = new File(RealPath);
            
            Document doc = builder.build(build);
            Element Data = doc.getRootElement();
            Element pregunta = new Element("pregunta");
            List lista = Data.getChildren("pregunta");
            
            String idpreg;
            int id2;
            
            if(lista.isEmpty()){
                idpreg="1";
            }
            else{
                Element aux = (Element)lista.get(lista.size()-1);
                idpreg = aux.getAttributeValue("idpreg");
                id2 = Integer.parseInt(idpreg)+1;
                idpreg=Integer.toString(id2);
            }
            Data.addContent(pregunta);
            pregunta.setAttribute("idpreg",idpreg);
            pregunta.setAttribute("tipo","1");
            Element nombre = new Element("nombre");
            Element text = new Element("texto");
            Element media = new Element("media");
            nombre.setText(name);
            text.setText(texto);
            media.setText(sel);
            pregunta.addContent(nombre);
            pregunta.addContent(text);
            pregunta.addContent(media);
            for(int i = 1 ;i<=cont;i++){
                Element grupo = new Element("grupo");
                Element opciones = new Element("opciones");
                grupo.setAttribute("idgroup",Integer.toString(i));
                pregunta.addContent(grupo);
                grupo.addContent(opciones);
                for(int j =1 ; j<5 ; j++){
                    Element opt = new Element ("op");
                    opt.setText(request.getParameter("input"+i+"_"+j+" "));
                    opciones.addContent(opt);
               // System.err.println(request.getParameter("input"+i+"_"+j+" "));
            }
        }
            
                        XMLOutputter xmlo = new XMLOutputter();

            try (FileWriter fw = new FileWriter(RealPath)) {
                xmlo.setFormat(Format.getPrettyFormat());//Formato de salida al xml
                xmlo.output(doc, fw);//se escribe en el archivo
                fw.flush();
            }
            catch (Exception e) {
            e.printStackTrace();
        }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "profesor";
    }

    
    
    
    
    
    private int contCaracteres(String texto, String caracter) {
        int index,contador=0;
        index = texto.indexOf(caracter);
        while(index!=-1){
            contador++;
            index = texto.indexOf(caracter, index+1);
        }
        return contador;
    }
    
}
