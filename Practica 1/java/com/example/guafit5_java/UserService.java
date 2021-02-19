package com.example.guafit5_java;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserService {
    @GET("login/Usuario/{user}/{contra}")
    Call<LoginResponse> loginUser(@Path("user") String user, @Path("contra") String contra);

    @POST("AddMed/Usuario/")
    Call<DataResponse> sendSData(@Body DataRequest dataRequest);
}
