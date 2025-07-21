pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-cred-id'
    IMAGE_TAG = "react-backend-fullstack-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Push to DockerHub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CRED) {
            sh 'docker-compose push'
          }
        }
      }
    }

    stage('Deploy (Remoto)') {
      steps {
        sshagent(['tu-servidor-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no user@host <<EOF
              cd /ruta/proyecto
              docker-compose pull
              docker-compose down
              docker-compose up -d
            EOF
          '''
        }
      }
    }
  }
}