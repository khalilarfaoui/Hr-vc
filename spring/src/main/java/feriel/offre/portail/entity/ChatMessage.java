package feriel.offre.portail.entity;

public class ChatMessage {
    private String type;
    private String content;
    private String sender;
    private String rec;

    private Number dateMessege;




    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public Number getDateMessege() {
        return dateMessege;
    }
    public void setDateMessege(Number dateMessege) {
        this.dateMessege = dateMessege;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRec() {
        return rec;
    }
    public void setRec(String rec) {
        this.rec = rec;
    }
}

