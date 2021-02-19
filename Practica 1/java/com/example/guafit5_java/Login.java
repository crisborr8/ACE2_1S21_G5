package com.example.guafit5_java;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends AppCompatActivity {
    Button btnLogin;
    EditText user, contra;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        btnLogin = findViewById(R.id.btnLogin);
        user = findViewById(R.id.log_email);
        contra = findViewById(R.id.log_password);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(TextUtils.isEmpty(user.getText().toString()) || TextUtils.isEmpty(contra.getText().toString())){
                    Toast.makeText(Login.this, "Llena todos los campos", Toast.LENGTH_SHORT).show();
                }else{
                    LoginRequest loginRequest = new LoginRequest();
                    loginUser(user.getText().toString(), contra.getText().toString());
                }
            }
        });
    }

    public void loginUser(String user, String contra){
        Call<LoginResponse>  loginResponseCall = ApiClient.getService().loginUser(user, contra);
        loginResponseCall.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if(response.isSuccessful()){
                    LoginResponse loginResponse = response.body();
                    Toast.makeText(Login.this, "Datos correctos", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getBaseContext(), User.class);
                    intent.putExtra("ID_USER", loginResponse.getId_User());
                    startActivity(intent);
                    //startActivity(new Intent(Login.this, User.class));
                }else{
                    Toast.makeText(Login.this, "Datos incorrectos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                String message = t.getLocalizedMessage();
                Toast.makeText(Login.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }
}