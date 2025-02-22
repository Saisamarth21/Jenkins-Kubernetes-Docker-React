pipeline {
    agent any

    environment {
        // These environment variables will be provided from the credentials
        DOCKERHUB_USR = credentials('dockerhub-credentials').username
        DOCKERHUB_PSW = credentials('dockerhub-credentials').password
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your GitHub repository
                git 'https://github.com/Saisamarth21/React-todo'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build the image tagged with your Docker Hub ID
                sh 'docker build -t saisamarth21/react-todo:latest .'
            }
        }
        stage('Docker Login & Push') {
            steps {
                // Log in to Docker Hub using the credentials
                sh '''
                  echo "$DOCKERHUB_PSW" | docker login --username "$DOCKERHUB_USR" --password-stdin
                  docker push saisamarth21/react-todo:latest
                '''
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                // Use the kubeconfig credential (if applicable) to deploy to your cluster.
                // If Jenkins already has access to kubectl, you can omit the withCredentials block.
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                      kubectl apply -f react-dpl.yml
                      kubectl rollout status deployment/react-todo-deployment
                    '''
                }
            }
        }
    }
    post {
        failure {
            echo 'The pipeline failed.'
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
