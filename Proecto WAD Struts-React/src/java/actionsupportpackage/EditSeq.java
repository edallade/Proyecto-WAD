package actionsupportpackage;

import com.opensymphony.xwork2.ActionSupport;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;

public class EditSeq extends ActionSupport {

    private String idPreg;

    @Override
    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        idPreg = request.getParameter("idRef");
        System.out.println(idPreg);
        request.getSession().setAttribute("valorPreg", idPreg);
        return "success";
    }

    public String getIdPreg() {
        return idPreg;
    }

    public void setIdPreg(String idPreg) {
        this.idPreg = idPreg;
    }
}
