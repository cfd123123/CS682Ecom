# Set up container from an existing nodejs image. The image will be downloaded
# from docker hub if you haven't downloaded it already.
FROM node:13.7.0
# Specify the working directory, then copy over the config files
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN ls -al

# I was having some trouble with npm dependencies, and somewhere in my work
# I added the below two lines. It may be ok to remove them?
RUN npm cache verify
RUN npm install -g npm

# Install npm, then some dependencies, then fix any vulnerabilities found.
RUN npm install
RUN npm install jquery typescript eslint-plugin-flowtype@3 popper.js
RUN npm audit fix

# Copy the entire frontend directory
COPY src ./src
COPY public ./public
RUN ls -al

# expose port 3000, allowing a browser to access it
EXPOSE 3000

# Finally, start the front end
CMD npm run start