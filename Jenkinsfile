pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-cred-id'
    IMAGE_TAG = "juanroman08/asistente-financiero-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Build Frontend') {
      steps {
        script {
          // Ejecutar en contenedor Node.js solo esta parte
          def nodeImage = docker.image('node:18-alpine')
          nodeImage.pull()
          nodeImage.inside {
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
        sh """
          docker build -t ${IMAGE_TAG}-frontend ./frontend
          docker build -t ${IMAGE_TAG}-backend ./backend
        """
      }
    }

    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([credentialsId: DOCKERHUB_CRED, url: '']) {
          sh """
            docker push ${IMAGE_TAG}-frontend
            docker push ${IMAGE_TAG}-backend
          """
        }
      }
    }

    stage('Deploy (Remoto)') {
      steps {
        sshagent(['tu-servidor-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no user@host <<EOF
              cd /ruta/proyecto
              docker pull ${IMAGE_TAG}-frontend
              docker pull ${IMAGE_TAG}-backend
              docker-compose down
              docker-compose up -d
            EOF
          """
        }
      }
    }
  }
}