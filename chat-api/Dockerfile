# # Build Stage
# FROM maven:3.9.2-eclipse-temurin-17 AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src/ ./src/
# RUN mvn clean package -DskipTests

# # Run Stage
# FROM openjdk:17-jdk-alpine
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]

# Dockerfile for Spring Boot application with DevTools
FROM openjdk:17-jdk-alpine

RUN apk add --no-cache maven git bash

# Create app directory and user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

# Copy pom.xml and download dependencies
COPY --chown=spring:spring pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY --chown=spring:spring src ./src

# Enable DevTools Restart
ENV SPRING_DEVTOOLS_RESTART_ENABLED=true

# Run using Maven
CMD ["mvn", "spring-boot:run"]

