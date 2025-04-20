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