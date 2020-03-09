# Find an openjdk image with version 11
FROM openjdk:11

# Copy the backend folder to the container, then set it as the working directory
COPY . /backend
WORKDIR /backend

# Expose port 8080 so the front end can reach the back end.
EXPOSE 8080

# Start the backend server
CMD ./gradlew bootRun