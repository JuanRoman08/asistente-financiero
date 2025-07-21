pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-cred-id'
    IMAGE_TAG = "react-backend-fullstack-${env.BUILD_NUMBER}"
  }

  stages {
    // Este stage se puede omitir si Jenkins ya hace checkout desde la configuración del job
    stage('Checkout') {
      steps {
        git 'https://github.com/JuanRoman08/asistente-financiero.git'
      }
    }

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
            ssh user@host <<EOF
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