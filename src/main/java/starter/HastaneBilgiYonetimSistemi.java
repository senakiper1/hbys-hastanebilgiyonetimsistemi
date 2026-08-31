package starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"controller", "services", "repository", "exception"})
@EntityScan(basePackages = "entities") // Entity'lerin bulunduğu paket adı
@EnableJpaRepositories(basePackages = "repository") // Repository'lerin bulunduğu paket adı
public class HastaneBilgiYonetimSistemi {

    public static void main(String[] args) {
        SpringApplication.run(HastaneBilgiYonetimSistemi.class, args);
    }
}