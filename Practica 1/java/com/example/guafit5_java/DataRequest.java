package com.example.guafit5_java;

public class DataRequest {
    private String Id_User;

    public String getId_User() {
        return Id_User;
    }

    public void setId_User(String id_User) {
        Id_User = id_User;
    }

    public String getTemperatura() {
        return Temperatura;
    }

    public void setTemperatura(String temperatura) {
        Temperatura = temperatura;
    }

    public String getRitmo_Cardiaco() {
        return Ritmo_Cardiaco;
    }

    public void setRitmo_Cardiaco(String ritmo_Cardiaco) {
        Ritmo_Cardiaco = ritmo_Cardiaco;
    }

    public String getOxigenoES() {
        return OxigenoES;
    }

    public void setOxigenoES(String oxigenoES) {
        OxigenoES = oxigenoES;
    }

    private String Temperatura;
    private String Ritmo_Cardiaco;
    private String OxigenoES;
}
