package com.example.guafit5_java;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Toast;

import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class User extends AppCompatActivity {

    DataRequest dataRequest = new DataRequest();
    Random r = new Random();
    int r2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        String id = getIntent().getStringExtra("ID_USER");
        Timer timerObj = new Timer();
        TimerTask timerTaskObj = new TimerTask() {
            @Override
            public void run() {
                dataRequest.setId_User(id);
                r2 = r.nextInt(300-50) + 50;
                dataRequest.setOxigenoES(String.valueOf(r2));
                r2 = r.nextInt(300-50) + 50;
                dataRequest.setRitmo_Cardiaco(String.valueOf(r2));
                r2 = r.nextInt(300-50) + 50;
                dataRequest.setTemperatura(String.valueOf(r2));
                sendData(dataRequest);
            }
        };
        timerObj.schedule(timerTaskObj, 1000, 1000);
    }

    public void sendData(DataRequest dataRequest){
        Call<DataResponse> dataResponseCall = ApiClient.getService().sendSData(dataRequest);
        dataResponseCall.enqueue(new Callback<DataResponse>() {
            @Override
            public void onResponse(Call<DataResponse> call, Response<DataResponse> response) {
                if(response.isSuccessful()){
                    Toast.makeText(User.this, "Dato enviado", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(User.this, "Fallo en envio", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<DataResponse> call, Throwable t) {
                String message = t.getLocalizedMessage();
                Toast.makeText(User.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }
}