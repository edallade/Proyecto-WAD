package actionsupportpackage;

import static com.opensymphony.xwork2.Action.INPUT;
import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionSupport;
import entity.Login; 
import entity.HibernateUtil;
import org.hibernate.Session;

public class LoginActionSupport extends ActionSupport {//esta clase es un java bean, sus atributos tienen setter y getter
    //action suport se usa interfaz serializable 
    //tambien para usar las constantes ya definidas de la clase 
 private String userName,password;
 Session hibernateSession;
 Login login;//manipula objeto que maneja tabla de la BD
 @Override
 public String execute() throws Exception {
     System.out.println(userName+"+++++++++++++++++++++++++++++++++++++++++++++");
     //recuperar sesion de hibernet siempre 
 hibernateSession=HibernateUtil.getSessionFactory().openSession();
 /*transaccion es una serie de operaciones,que tienen una condicion 
 si algun paso falla la bd regresa  su estado original
 hibernateSession.beginTransaction();*/
 System.out.println("session get");
 
    if(userName!=null && password!=null &&(!userName.equals(""))&&(!password.equals(""))){
        //recuperamos datos de la base de datos con la sesion de hibernet 
        //hibernet majea hql lenguaje de consultas de hibernet 
     login=(Login) hibernateSession.createQuery("from Login where userName='"+userName+"'AND password='"+password+"'").uniqueResult();
     }
    else{
     addActionError("User Name does not exist");
     return INPUT;
 }
    
 if(login==null){
    addActionError("User Name does not exist");
     return INPUT;
     }
 addActionMessage("Welcome you logined");
 return SUCCESS;
 }
 
 public String getPassword() {
 return password;
 }
 
 public void setPassword(String password) {
 this.password = password;
 }
 
 public String getUserName() {
 return userName;
 }
 
 public void setUserName(String userName) {
 this.userName = userName;
 }
 
}