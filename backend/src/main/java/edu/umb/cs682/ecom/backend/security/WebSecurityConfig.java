package edu.umb.cs682.ecom.backend.security;

import edu.umb.cs682.ecom.backend.security.jwt.AuthEntryPointJwt;
import edu.umb.cs682.ecom.backend.security.jwt.AuthTokenFilter;
import edu.umb.cs682.ecom.backend.security.services.CustomAccessDeniedHandler;
import edu.umb.cs682.ecom.backend.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * <code>WebSecurityConfig</code> provides {@link HttpSecurity} configurations
 * for this app. This class orchestrates security across the entire backend.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    /**
     * Default constructor <code>WebSecurityConfig</code>.
     */
    public WebSecurityConfig() {}

    /**
     * Returns a new instance of {@link AuthTokenFilter}.
     * @return a new instance of {@link AuthTokenFilter}
     */
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    /**
     * Obtains an {@link AuthenticationManager} using the given
     * {@link AuthenticationManagerBuilder}, adding user details and encoding
     * the user's password with a {@link PasswordEncoder}.
     *
     * @param authenticationManagerBuilder the {@link SecurityBuilder} to be used
     * @throws Exception if an error occurs when adding the {@link UserDetailsService} based authentication
     */
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    /**
     * Exposes the {@link AuthenticationManager} as a Bean.
     *
     * @return the {@link AuthenticationManager} Bean object
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * Returns a new {@link CustomAccessDeniedHandler}.
     * @return a new {@link CustomAccessDeniedHandler}
     */
    @Bean
    public AccessDeniedHandler accessDeniedHandler(){
        return new CustomAccessDeniedHandler();
    }

    /**
     * Returns a new {@link PasswordEncoder}.
     * @return a new {@link PasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the {@link HttpSecurity} for this app.
     * <p>
     *     Configures CORS, CSFR, session management, resource protection rules,
     *     specifies the {@link AuthEntryPointJwt} handler, and adds the
     *     {@link AuthTokenFilter}.
     * </p>
     *
     * @param http the {@link HttpSecurity} to be configured
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().accessDeniedHandler(accessDeniedHandler())
                .authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/user/**").permitAll()
                .antMatchers("/products/**").permitAll()
                .antMatchers("/category/**").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
