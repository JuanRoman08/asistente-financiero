pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-cred-id' // ID de la credencial en Jenkins para DockerHub
    IMAGE_TAG = "juanroman08/asistente-financiero-${BUILD_NUMBER}"
  }

  stages {

    stage('Build Frontend') {
      steps {
        script {
          docker.image('node:18-alpine').inside {
            dir('frontend') {
              sh 'npm install'
              sh 'npm run build'
            }
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          sh """
            docker build -t ${IMAGE_TAG}-frontend ./frontend
            docker build -t ${IMAGE_TAG}-backend ./backend
          """
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CRED) {
            sh """
              docker push ${IMAGE_TAG}-frontend
              docker push ${IMAGE_TAG}-backend
            """
          }
        }
      }
    }

    stage('Deploy (Remoto)') {
      steps {
        sshagent(['tu-servidor-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no user@host <<EOF
              docker pull ${IMAGE_TAG}-frontend
              docker pull ${IMAGE_TAG}-backend
              docker stop backend || true
              docker stop frontend || true
              docker rm backend || true
              docker rm frontend || true
              docker run -d --name backend -p 8000:8000 ${IMAGE_TAG}-backend
              docker run -d --name frontend -p 3000:80 ${IMAGE_TAG}-frontend
            EOF
          """
        }
      }
    }
  }
}