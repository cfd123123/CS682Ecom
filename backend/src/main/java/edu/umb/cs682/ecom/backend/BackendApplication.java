package edu.umb.cs682.ecom.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * <code>BackendApplication</code> is the starting point of this backend
 * application. SpringBoot runs this class to begin the application.
 */
@SpringBootApplication
public class BackendApplication {

	/**
	 * Default constructor for <code>BackendApplication</code>.
	 */
	public BackendApplication() {}

	/**
	 * Entry point of this application.
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
