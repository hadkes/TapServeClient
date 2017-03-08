package edu.tcd.tapserve.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Return the login User information in UserInfoController.UserInfo object. To
 * call this servlet use /tapserve/userInfo/<user_name> URL.
 * 
 * @author Sachin Hadke
 *
 */
public class UserInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		String userName = request.getRemoteUser();
		System.out.println("userName " + userName);
		HttpURLConnection conn = null;
		if (userName != null) {
			// pick up the values from web.xml init-param tags
			String hostName = getServletConfig().getInitParameter("service_hostname");
			String port = getServletConfig().getInitParameter("service_port");
			String appContext = getServletConfig().getInitParameter("app_context");
			String userInfoService = getServletConfig().getInitParameter("user_info_service");

			// if no init-param tags are defined then use default values
			if (hostName == null) {
				hostName = "localhost";
			}
			if (port == null) {
				port = "8083";
			}
			if (appContext == null) {
				appContext = "tapserve";
			}
			if(userInfoService == null){
				userInfoService = "userInfo";
			}
			
			// construct a service URL
			String serviceURL = "http://" + hostName + ":" + port + "/" + appContext +"/"+userInfoService +"/"+userName;
			System.out.println("Service URL is "+serviceURL);
			
			try {
				// make a call using java URL and HttpURLConnection API
				URL url = new URL(serviceURL);
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Accept", "application/json");

				if (conn.getResponseCode() != 200) {
					throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				String output;
				while ((output = br.readLine()) != null) {
					System.out.println("Output from Server .... \n"+output);
					response.getOutputStream().print(output);
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(conn != null){
					conn.disconnect();					
				}
			}
		}
	}
}
